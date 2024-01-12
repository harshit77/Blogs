"use client";

import { useCallback } from "react";
import ExcelJs from "exceljs";
import { SAMPLE_BLOG } from "@/app/constants";
import { Button } from "./ui/button";
import { postValidationRule } from "@/lib/utils";
import { Download } from "lucide-react";

const startDownload = (file: BlobPart, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

export default function CreateSampleFile({
  selectedPostType,
}: {
  selectedPostType: string;
}) {
  const createWorkBook = useCallback(async () => {
    const workbookInstance = new ExcelJs.Workbook();
    const workSheet = workbookInstance.addWorksheet("Sheet1");
    workSheet.addRow([...SAMPLE_BLOG]).commit();
    postValidationRule(workSheet);
    const buffer = await workbookInstance.xlsx.writeBuffer();
    startDownload(buffer, `${selectedPostType}.xlsx`);
  }, [selectedPostType]);

  return (
    <Button onClick={() => createWorkBook()}>
      {`Download ${selectedPostType}  Sample File `}
      <Download className="ml-2" />
    </Button>
  );
}
