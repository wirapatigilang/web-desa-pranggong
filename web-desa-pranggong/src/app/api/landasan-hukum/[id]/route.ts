import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Publik & tanpa auth — landasan hukum desa memang dokumen terbuka untuk warga.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await prisma.legalBasis.findUnique({
    where: { id },
    select: { fileData: true, fileName: true, fileType: true },
  });

  if (!item?.fileData) {
    return NextResponse.json(
      { message: "File tidak ditemukan." },
      { status: 404 },
    );
  }

  return new NextResponse(new Uint8Array(item.fileData), {
    headers: {
      "Content-Type": item.fileType ?? "application/pdf",
      "Content-Disposition": `attachment; filename="${item.fileName ?? "dokumen.pdf"}"`,
    },
  });
}
