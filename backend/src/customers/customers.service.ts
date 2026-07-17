import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../generated/prisma/client.js';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const customers = await this.prisma.user.findMany({
      where: {
        role: UserRole.CUSTOMER,
      },
      include: {
        orders: {
          where: {
            status: {
              in: ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'],
            },
          },
          select: {
            total: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return customers.map((c) => {
      // Calculate total spend
      const totalSpend = c.orders.reduce(
        (sum, order) => sum + Number(order.total),
        0,
      );

      return {
        id: c.id,
        email: c.email,
        firstName: c.firstName,
        lastName: c.lastName,
        status: c.status,
        createdAt: c.createdAt,
        joinedDate: c.createdAt,
        orderCount: c._count.orders,
        totalSpend,
      };
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.user.findFirst({
      where: {
        id,
        role: UserRole.CUSTOMER,
      },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
        },
        addresses: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }

    // Calculate total spend
    const activeOrders = customer.orders.filter((o) =>
      ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'].includes(
        o.status,
      ),
    );
    const totalSpend = activeOrders.reduce(
      (sum, order) => sum + Number(order.total),
      0,
    );

    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      status: customer.status,
      createdAt: customer.createdAt,
      joinedDate: customer.createdAt,
      orderCount: customer.orders.length,
      totalSpend,
      orders: customer.orders,
      addresses: customer.addresses,
    };
  }
}
