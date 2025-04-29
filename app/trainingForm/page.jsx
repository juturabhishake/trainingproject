"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    section: "",
    department: "",
    placeOfTraining: "",
    programTitle: "",
    trainerName: "",
    mode: "",
    duration: "",
    trainingDate: new Date(),
    evaluationDate: new Date(),
    ratings: Array(10).fill(0),
  });

  const stepsTotal = 5;

  const handleNext = () => {
    if (step < stepsTotal) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateForm = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const setRating = (index, value) => {
    const updated = [...formData.ratings];
    updated[index] = value;
    setFormData({ ...formData, ratings: updated });
  };
  const calculateOverallRating = () => {
    const totalRating = formData.ratings.reduce((sum, rating) => sum + rating, 0);
    return totalRating / formData.ratings.length;
  };

  const calculatePercentage = () => {
    const totalRating = formData.ratings.reduce((sum, rating) => sum + rating, 0);
    return (totalRating / (formData.ratings.length * 5)) * 100;
  };
  const handleSubmit = async () => {
    console.log("Ratings:", formData.ratings);
    console.log("Form Data:", formData);
    const overallRating = calculateOverallRating();
    const percentage = calculatePercentage();
    const existingPdfBytes = await fetch("/Training_Effect_Tracing_Form.pdf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    firstPage.drawText(formData.employeeName, {
      x: 170,
      y: height - 54,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(formData.employeeId, {
      x: 170,
      y: height - 76,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.designation, {
        x: 170,
        y: height - 98,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.section, {
        x: 170,
        y: height - 120,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.department, {
        x: 170,
        y: height - 142,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.placeOfTraining, {
        x: 170,
        y: height - 163,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.programTitle, {
        x: 382,
        y: height - 52,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.trainerName, {
        x: 382,
        y: height - 74,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    let modeX = 420;
    if (formData.mode === "internal") {
        modeX = 420; 
    } else if (formData.mode === "external") {
        modeX = 455;
    } else if (formData.mode === "overseas") {
        modeX = 495;
    }
    const imageBytes = await fetch("/tick.png").then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const imageDims = image.scale(0.015);
    firstPage.drawImage(image, {
        x: modeX,  
        y: height - 90,   
        width: imageDims.width,
        height: imageDims.height,
    });
    firstPage.drawText(formData.duration, {
        x: 382,
        y: height - 118,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.trainingDate.toLocaleDateString(), {
        x: 382,
        y: height - 140,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.evaluationDate.toLocaleDateString(), {
        x: 382,
        y: height - 162,
        size: 8,
        font,
        color: rgb(0, 0, 0),
    });
    let ratingYPositions = [226, 253, 276, 300.5, 324.5, 347.5, 373, 397, 420.5, 444];
    const tickImageBytes = await fetch("/tick.png").then(res => res.arrayBuffer());
    const tickImage = await pdfDoc.embedPng(tickImageBytes);
    const tickImageDims = tickImage.scale(0.015);
    formData.ratings.forEach((rating, idx) => {
      let rowY = height - ratingYPositions[idx];
      let xOffset = 388 + (rating - 1) * 10;
      if (rating == 1) {
        xOffset = 388;
      } else if (rating == 2) {
        xOffset = 419;
      } else if (rating == 3) {
        xOffset = 448;
      } else if (rating == 4) {
        xOffset = 474.5;
      } else if (rating == 5) {
        xOffset = 502;
      }// else if (rating == 6) {
    //     xOffset = 488;
    //   } else if (rating == 7) {
    //     xOffset = 508;
    //   } else if (rating == 8) {
    //     xOffset = 528;
    //   } else if (rating == 9) {
    //     xOffset = 548;
    //   } else if (rating == 10) {
    //     xOffset = 568;
    //   }
      if (rating > 0) {
        firstPage.drawImage(tickImage, { x: xOffset, y: rowY, width: tickImageDims.width, height: tickImageDims.height });
        firstPage.drawText(rating.toString(), { x: 525, y: rowY - 2, size: 8, font, color: rgb(0, 0, 0) });
      }
    });

    firstPage.drawText(overallRating.toFixed(2), { x: 520, y: height - 465, size: 8, font, color: rgb(0, 0, 0) });
    firstPage.drawText(percentage.toFixed(2) + "%", { x: 520, y: height - 482, size: 8, font, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Training_Effect_Tracing_Form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-26 flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-tr from-white to-gray-200 dark:from-gray-800 dark:to-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 transition-all duration-500">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-4xl font-bold text-center mb-8">
          Training Effectiveness Form
        </motion.h1>

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["employeeName", "Employee Name"],
                ["employeeId", "Employee ID"],
                ["designation", "Designation"],
                ["section", "Section"],
                ["department", "Department"],
                ["placeOfTraining", "Place of Training"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block font-semibold mb-1">{label}</label>
                  <input type="text" value={formData[key]} onChange={(e) => updateForm(key, e.target.value)} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["programTitle", "Program Title"],
                ["trainerName", "Trainer Name"],
                ["mode", "Mode of Training"],
                ["duration", "Duration"],
                ["trainingDate", "Date of Training"],
                ["evaluationDate", "Date of Evaluation"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block font-semibold mb-1">{label}</label>
                  {key === "trainingDate" || key === "evaluationDate" ? (
                    <DatePicker
                        selected={formData[key]}
                        onChange={(date) => updateForm(key, date)}
                        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                        calendarClassName="w-full"
                        wrapperClassName="w-full"
                  />
                  ) : key === "mode" ? (
                    <select
                      value={formData[key]}
                      onChange={(e) => updateForm(key, e.target.value)}
                      className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                    >
                      <option value="">Select Mode</option>
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                      <option value="overseas">Overseas</option>
                    </select>
                  ) : (
                    <input type="text" value={formData[key]} onChange={(e) => updateForm(key, e.target.value)} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
            <p>Rating Instructions:</p>
            <p>1 - Poor, 2 - Average, 3 - Good, 4 - Very Good, 5 - Excellent</p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-8">
            {["Benefit to person", "Benefit to team", "Benefit to department", "Improvement in process", "Technical knowledge", "Working improvement", "Creativity", "Meeting requirements", "Managerial change", "Usefulness"].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-medium mb-1">{idx + 1}. {item}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${formData.ratings[idx] >= star ? "text-yellow-500" : "text-gray-400"}`}
                      onClick={() => setRating(idx, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center text-lg font-semibold mb-6">Click below to generate PDF</div>
            <div className="flex justify-center">
              <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg">Submit & Download</button>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && <button onClick={handlePrevious} className="px-4 py-2 rounded bg-gray-400 dark:bg-gray-700 text-white">Previous</button>}
          {step < stepsTotal && <button onClick={handleNext} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white">Next</button>}
        </div>
      </div>
    </div>
  );
};

export default Page;
