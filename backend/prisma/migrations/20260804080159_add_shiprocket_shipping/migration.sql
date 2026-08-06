-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('NEW', 'COURIER_ASSIGNED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RTO_INITIATED', 'RTO_DELIVERED');

-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('PENDING', 'SCHEDULED', 'PICKED_UP', 'CANCELLED');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "defaultHeight" DOUBLE PRECISION,
ADD COLUMN     "defaultLength" DOUBLE PRECISION,
ADD COLUMN     "defaultWeight" DOUBLE PRECISION,
ADD COLUMN     "defaultWidth" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "packageHeight" DOUBLE PRECISION,
ADD COLUMN     "packageLength" DOUBLE PRECISION,
ADD COLUMN     "packageWeight" DOUBLE PRECISION,
ADD COLUMN     "packageWidth" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ShippingSettings" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'SHIPROCKET',
    "shiprocketEmail" TEXT,
    "shiprocketPassword" TEXT,
    "pickupLocation" TEXT NOT NULL DEFAULT 'Primary',
    "defaultLength" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "defaultWidth" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "defaultHeight" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "defaultWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "weightUnit" TEXT NOT NULL DEFAULT 'kg',
    "autoCreateShipment" BOOLEAN NOT NULL DEFAULT false,
    "autoAssignCourier" BOOLEAN NOT NULL DEFAULT false,
    "autoGenerateAwb" BOOLEAN NOT NULL DEFAULT false,
    "autoSchedulePickup" BOOLEAN NOT NULL DEFAULT false,
    "autoGenerateManifest" BOOLEAN NOT NULL DEFAULT false,
    "autoGenerateLabel" BOOLEAN NOT NULL DEFAULT false,
    "freeShippingThreshold" DECIMAL(12,2) NOT NULL DEFAULT 2000.00,
    "standardShippingCharge" DECIMAL(12,2) NOT NULL DEFAULT 100.00,
    "expressShippingCharge" DECIMAL(12,2) NOT NULL DEFAULT 200.00,
    "codEnabled" BOOLEAN NOT NULL DEFAULT false,
    "internationalShipping" BOOLEAN NOT NULL DEFAULT false,
    "returnShippingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "rtoSettings" TEXT,
    "webhookSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "shiprocketOrderId" TEXT,
    "shipmentId" TEXT,
    "awb" TEXT,
    "courierCompanyId" INTEGER,
    "courier" TEXT,
    "courierRating" DOUBLE PRECISION,
    "estimatedDays" TEXT,
    "shippingCharge" DECIMAL(12,2),
    "codCharge" DECIMAL(12,2),
    "trackingUrl" TEXT,
    "pickupStatus" "PickupStatus" NOT NULL DEFAULT 'PENDING',
    "shipmentStatus" "ShipmentStatus" NOT NULL DEFAULT 'NEW',
    "statusCode" INTEGER,
    "labelUrl" TEXT,
    "manifestUrl" TEXT,
    "invoiceUrl" TEXT,
    "pickupScheduledDate" TIMESTAMP(3),
    "pickupTokenNumber" TEXT,
    "length" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "pickupLocation" TEXT,
    "estimatedDelivery" TIMESTAMP(3),
    "lastTrackingUpdate" TIMESTAMP(3),
    "rawShipmentData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentLog" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "performedBy" TEXT NOT NULL DEFAULT 'SYSTEM',
    "remarks" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentEvent" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "statusCode" INTEGER,
    "activity" TEXT NOT NULL,
    "location" TEXT,
    "eventTimestamp" TIMESTAMP(3) NOT NULL,
    "rawPayload" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingWebhookLog" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "event" TEXT,
    "payload" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShippingWebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_orderId_key" ON "Shipment"("orderId");

-- CreateIndex
CREATE INDEX "ShipmentLog_shipmentId_idx" ON "ShipmentLog"("shipmentId");

-- CreateIndex
CREATE INDEX "ShipmentEvent_shipmentId_idx" ON "ShipmentEvent"("shipmentId");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentLog" ADD CONSTRAINT "ShipmentLog_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentEvent" ADD CONSTRAINT "ShipmentEvent_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
