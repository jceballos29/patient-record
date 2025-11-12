"use server";

import { CreateOfficeFormData, Office } from "@/types/office";
import { prisma } from "../prisma";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function getOffices() {
  return getCachedOffices();
}

export const getCachedOffices = unstable_cache(
  async () => {
    try {
      const offices = await prisma.office.findMany({
        select: {
          id: true,
          name: true,
          doctor: true,
          _count: {
            select: { patients: true },
          },
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      const officesIds = offices.map(office => office.id);

      if (officesIds.length === 0) {
        return { success: true, data: [] as Office[] };
      }

      const patients = await prisma.patient.findMany({
        where: {
          officeId: { in: officesIds }
        },
        select: {
          id: true,
          officeId: true,
          _count: {
            select: { sessions: true, authorizations: true }
          }
        }
      });

      const patientIds = patients.map(patient => patient.id);

      const payments = await prisma.payment.findMany({
        where: { patientId: { in: patientIds } },
        select: { patientId: true, amount: true }
      });

      const statsMap: Record<string, { sessions: number; authorizations: number; payments: number }> = {};
      for (const office of offices) {
        statsMap[office.id] = { sessions: 0, authorizations: 0, payments: 0 };
      }

      for (const patient of patients) {
        statsMap[patient.officeId].sessions += (patient._count.sessions || 0);
        statsMap[patient.officeId].authorizations += (patient._count.authorizations || 0);
      }

      const patientToOffice: Record<string, string> = {};
      for (const patient of patients) patientToOffice[patient.id] = patient.officeId;

      for (const payment of payments) {
        const officeId = patientToOffice[payment.patientId];
        if (!officeId) continue;

        const amount = Number(payment.amount) || 0;
        statsMap[officeId].payments += amount;
      }

      const response: Office[] = offices.map(office => ({
        id: office.id,
        name: office.name,
        doctor: office.doctor,
        patients: office._count.patients,
        sessions: statsMap[office.id].sessions,
        authorizations: statsMap[office.id].authorizations,
        payments: statsMap[office.id].payments,
      }));

      return { success: true, data: response };
    } catch (error) {
      console.error('Error fetching offices:', error);
      return { success: false, error: 'Failed to fetch offices' };
    }
  },
  ["Offices"],
  { revalidate: 300, tags: ["Offices"] }
)

export const createOffice = async (data: CreateOfficeFormData) => {
  try {
    const office = await prisma.office.create({
      data: {
        name: data.name,
        doctor: data.doctor
      }
    });

    revalidateTag("Offices", "max");
    revalidatePath("/");

    return { success: true, data: office };
  } catch (error) {
    console.error('Error creating office:', error);
    return { success: false, error: 'Failed to create office' };
  }
};