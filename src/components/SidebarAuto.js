import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormModalContextProvider from "../context/FormModalContext";
import Form from "./Form";
import Select from "./Select/Select";
import { WORKSPACE, getAllWorkspace } from "../hooks/useWorkspaces";
import useSWR from "swr";
import useCookie from "../hooks/useCookie";


const steps = [
  { label: "Select Dataset" },
  { label: "Preprocessing Check" },
  { label: "Select Target"},
];


export default function SidebarAuto() {
    const [activeStep, setActiveStep] = useState(0);  // State to keep track of the active step

    return (
      <div className="mr-7 relative py-4 pl-8 h-[calc(200vh-55px)] bg-white shadow pr-4">
        <ul className="flex flex-col gap-8 py-4">
          {steps.map((step, index) => (
            <li key={index} className={`flex items-center font-medium cursor-pointer transition duration-300 ${index === activeStep ? 'text-green-500' : 'hover:text-gray-500'}`}
              onClick={() => setActiveStep(index)}>
              {index + 1}. {step.label}
            </li>
          ))}
        </ul>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20">
          <img src="/assets/LumbaSidebar.svg" alt="Lumba" />
        </div>
      </div>
    );
}
