-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventOrganizerId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventOrganizer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventOrganizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageEvent" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "ImageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageOrganizer" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,

    CONSTRAINT "ImageOrganizer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventOrganizer_email_key" ON "EventOrganizer"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventOrganizerId_fkey" FOREIGN KEY ("eventOrganizerId") REFERENCES "EventOrganizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageEvent" ADD CONSTRAINT "ImageEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOrganizer" ADD CONSTRAINT "ImageOrganizer_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "EventOrganizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
