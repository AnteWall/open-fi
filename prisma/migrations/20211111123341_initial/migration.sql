-- CreateTable
CREATE TABLE "InsiderTrade" (
    "id" TEXT NOT NULL,
    "publicationDateTime" TIMESTAMP(3) NOT NULL,
    "issuer" TEXT NOT NULL,
    "leiCode" TEXT NOT NULL,
    "notifier" TEXT NOT NULL,
    "managerialResponsibilities" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "closelyAssociated" BOOLEAN NOT NULL DEFAULT false,
    "amendment" BOOLEAN NOT NULL DEFAULT false,
    "amendmentDetails" TEXT NOT NULL,
    "initialNotification" TEXT NOT NULL,
    "shareOrOptionProgram" BOOLEAN NOT NULL DEFAULT false,
    "transactionType" TEXT NOT NULL,
    "instrumentType" TEXT NOT NULL,
    "instrumentName" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "transactionDateTime" TIMESTAMP(3) NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "InsiderTrade_pkey" PRIMARY KEY ("id")
);
