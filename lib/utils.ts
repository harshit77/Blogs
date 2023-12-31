import { type ClassValue, clsx } from "clsx";
import { Worksheet, Row, Cell, RichText, CellRichTextValue } from "exceljs";
import { twMerge } from "tailwind-merge";
import { BulkType, POST } from "@/app/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sheet_to_json(sheet: Worksheet, type: BulkType) {
  const cellToBeChecked = type === POST ? 2 : 3;
  const json_toSheet: string[][] = [];
  sheet.eachRow((row: Row) => {
    const newRow: string[] = [];
    row.eachCell(function (cell: Cell, colNumber: number): void {
      if (colNumber <= cellToBeChecked) {
        if (cell.value) {
          if ((cell.value as CellRichTextValue).richText && type === POST) {
            const cellRichText = (cell.value as CellRichTextValue).richText
              .map((textWithStyle: RichText) => {
                let richText = textWithStyle.text;
                if (textWithStyle.font?.bold) richText = `<b>${richText}</b>`;
                if (textWithStyle.font?.italic) richText = `<i>${richText}</i>`;
                if (textWithStyle.font?.strike)
                  richText = `<strike>${richText}</strike>`;
                return richText;
              })
              .join("");
            newRow.push(cellRichText);
          } else newRow.push(cell.value as string);
        }
      }
    });
    json_toSheet.push(newRow);
  });

  return type === POST
    ? json_toSheet.map(([title, content]) => ({
        title,
        content,
      }))
    : json_toSheet.map(([username, mobileNumber, email]) => ({
        username,
        mobileNumber,
        email,
      }));
}

export function draftMessage(username: string, title: string, content: string) {
  return `Hey <b>${username}<b>👋 has just posted a blog \n\n${title} \n\n\n ${content} \n\n\n<b>DashMind</b>\nhttps://dashmind.netlify.app `;
}
