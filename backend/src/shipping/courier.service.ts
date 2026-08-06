import { Injectable, Inject, Logger } from '@nestjs/common';
import { SHIPPING_PROVIDER, ShippingProvider } from './providers/ShippingProvider';
import { ShippingService } from './shipping.service';
import { EstimateShippingDto } from './shipping.dto';

export interface CourierOption {
  code: string;
  name: string;
  courierCompanyId: number;
  rate: number;
  estimatedDays: string;
  estimatedDeliveryDate?: string;
  rating?: number;
  isSurface?: boolean;
}

export interface ShippingEstimateResult {
  pincode: string;
  isServiceable: boolean;
  freeShippingEligible: boolean;
  couriers: CourierOption[];
  options: CourierOption[]; // Legacy compatibility wrapper
  defaultOption?: CourierOption;
}

@Injectable()
export class CourierService {
  private readonly logger = new Logger(CourierService.name);

  constructor(
    @Inject(SHIPPING_PROVIDER) private readonly provider: ShippingProvider,
    private readonly shippingService: ShippingService,
  ) {}

  /**
   * Estimate available couriers and rates for checkout.
   * Returns all available couriers (e.g. Blue Dart, Delhivery, XpressBees) with ratings and EDDs.
   */
  async estimateShipping(dto: EstimateShippingDto): Promise<ShippingEstimateResult> {
    const settings = await this.shippingService.getEffectiveSettings();
    const orderVal = dto.orderValue || 0;
    const isFree = orderVal >= settings.freeShippingThreshold;

    const weight = dto.weight || settings.defaultWeight;
    const length = dto.length || settings.defaultLength;
    const width = dto.width || settings.defaultWidth;
    const height = dto.height || settings.defaultHeight;

    try {
      const response = await this.provider.getServiceability({
        pickup_postcode: '110001',
        delivery_postcode: dto.pincode,
        weight,
        length,
        width,
        height,
        cod: 0,
        declared_value: orderVal,
      });

      const rawCouriers = response.data?.available_courier_companies || [];
      if (rawCouriers.length === 0) {
        return this.getFallbackEstimate(dto.pincode, isFree, settings);
      }

      // Map all available couriers
      const couriers: CourierOption[] = rawCouriers.map((c: any) => ({
        code: `COURIER_${c.courier_company_id}`,
        name: c.courier_name,
        courierCompanyId: c.courier_company_id,
        rate: isFree ? 0 : Number(c.rate || settings.standardShippingCharge),
        estimatedDays: `${c.estimated_delivery_days || '3-5'} days`,
        estimatedDeliveryDate: c.etd || undefined,
        rating: c.rating ? Number(c.rating) : 4.5,
        isSurface: c.is_surface,
      }));

      // Sort by price
      couriers.sort((a, b) => a.rate - b.rate);

      return {
        pincode: dto.pincode,
        isServiceable: true,
        freeShippingEligible: isFree,
        couriers,
        options: couriers,
        defaultOption: couriers[0],
      };
    } catch (error: any) {
      this.logger.warn(`Provider serviceability check error: ${error.message}. Returning fallback options.`);
      return this.getFallbackEstimate(dto.pincode, isFree, settings);
    }
  }

  private getFallbackEstimate(
    pincode: string,
    isFree: boolean,
    settings: any,
  ): ShippingEstimateResult {
    const stdRate = isFree ? 0 : settings.standardShippingCharge;
    const expRate = isFree ? 50 : settings.expressShippingCharge;

    const fallbacks: CourierOption[] = [
      {
        code: 'STANDARD',
        name: 'Standard Express Courier',
        courierCompanyId: 1,
        rate: stdRate,
        estimatedDays: '3-5 business days',
        rating: 4.5,
      },
      {
        code: 'EXPRESS',
        name: 'Priority Air Express',
        courierCompanyId: 2,
        rate: expRate,
        estimatedDays: '1-2 business days',
        rating: 4.8,
      },
    ];

    return {
      pincode,
      isServiceable: true,
      freeShippingEligible: isFree,
      couriers: fallbacks,
      options: fallbacks,
      defaultOption: fallbacks[0],
    };
  }
}
