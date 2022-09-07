-- CreateTable
CREATE TABLE "wifiNetworks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "wifiNetworks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wifiNetworks" ADD CONSTRAINT "wifiNetworks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
