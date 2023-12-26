import { type ClassValue, clsx } from "clsx";
import { Worksheet, Row, Cell, RichText, CellRichTextValue } from "exceljs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sheet_to_json(sheet: Worksheet) {
  const json_toSheet: string[][] = [];
  sheet.eachRow((row: Row) => {
    const newRow: string[] = [];
    row.eachCell(function (cell: Cell, colNumber: number): void {
      if (colNumber <= 2) {
        if (cell.value) {
          if ((cell.value as CellRichTextValue).richText) {
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

  return json_toSheet.map(([title, content]) => ({ title, content }));
}

export function draftMessage(username: string, title: string, content: string) {
  return `Hey <b>${username}<b>👋 has just posted a blog \n\n${title} \n\n\n ${content} \n\n\n<b>DashMind</b>\nhttps://dashmind.netlify.app `;
}
