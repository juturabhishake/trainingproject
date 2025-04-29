'use client';

import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const page = () => {
  const [empid, setEmpid] = useState('240442');
  const [empname, setEmpname] = useState('Abhishake Jutur');

  const modifyAndDownloadPDF1 = async (fileName, label) => {
    const existingPdfBytes = await fetch(`/${fileName}`).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    firstPage.drawText(`${empid}`, {
      x: 170,
      y: height - 55,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${empname}`, {
      x: 170,
      y: height - 75,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const modifyAndDownloadPDF2 = async (fileName, label) => {
    const existingPdfBytes = await fetch(`/${fileName}`).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    firstPage.drawText(`${empname}`, {
      x: 130,
      y: height - 58,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${empid}`, {
      x: 115,
      y: height - 88,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Training Effectiveness Tracing Form
          </h2>
          <button
            onClick={() => modifyAndDownloadPDF1('Training_Effect_Tracing_Form.pdf', 'Training_Effectiveness.pdf')}
            className="mt-auto flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
          >
            <FaFilePdf className="mr-2" />
            Download PDF
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Training Report (శిక్షణ నివేదిక)
          </h2>
          <button
            onClick={() => modifyAndDownloadPDF2('training_report.pdf', 'Training_Report.pdf')}
            className="mt-auto flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
          >
            <FaFilePdf className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
