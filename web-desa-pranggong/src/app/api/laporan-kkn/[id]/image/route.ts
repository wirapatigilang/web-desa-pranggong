import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Publik & tanpa auth — gambar laporan KKN memang untuk ditampilkan ke warga.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.kknReport.findUnique({
    where: { id },
    select: { imageData: true, imageName: true, imageType: true },
  });

  if (!item) {
    return NextResponse.json(
      { message: "Gambar tidak ditemukan." },
      { status: 404 },
    );
  }

  return new NextResponse(new Uint8Array(item.imageData), {
    headers: {
      "Content-Type": item.imageType,
      "Content-Disposition": `inline; filename="${item.imageName}"`,
    },
  });
}
