import { useState } from "react";
import { useRouter } from "next/router";
// import Breadcrumb from "../../../../../src/components/Breadcrumb";
// import FormModalContextProvider from "../../../../../src/context/FormModalContext";
// import Plus from "../../../../../src/components/Icon/Plus";
// import UploadFile from "../../../../../src/components/Form/UploadFile";
// import Dataset from "../../../../../src/components/Dataset";
import useDatasets from "../../../../../../../src/hooks/useDatasets";
import { useSearchParams } from "next/navigation";
import Seo from "../../../../../../../src/components/Seo";
// import CheckData from "../../../../../src/components/CheckData";
import useCookie from "../../../../../../../src/hooks/useCookie";
import Model from "../../../../../../../src/components/Model";
import useModels from "../../../../../../../src/hooks/useModels";
import Breadcrumb from "../../../../../../../src/components/Breadcrumb";
import { useContext } from "react";
import { AutoMLContext } from "../../../../../../../src/context/AutoMLContext";
import useAutoML from "../../../../../../../src/hooks/useAutoML";

// import axios from "axios";


const explain = () => {
    const router = useRouter();
    const { workspaceName, autoMLName, modelAutoName } = router.query;

    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    const username = useCookie("username");
    const projectTitle = autoMLName ? `${autoMLName} Project` : "AutoML Project";
    const { autoMLs, addAutoML } = useAutoML(workspaceName, username, type);
    const selectedAutoML = autoMLs.find((autoML) => autoML.name === autoMLName);
    const selectedModels = selectedAutoML?.automlmodels || [];
    const selectedModel = selectedModels.find((model) => model.name === modelAutoName);
    console.log("model", selectedModel)
    console.log("mode", selectedModel?.score);
    const score = selectedModel?.score;
    const shap = selectedModel?.shap_values;
    // split name selected model but only the first two words
    const name = selectedModel?.name.split('_').slice(0, 2).join(' & ');
    // const score = selectedModel?.score;
    let metrics = null;
    let shapVal = null;
    let foto = null;
    let FeatureImportance = null;
    let parameter = null;
    if (score) {
        try {
            metrics = JSON.parse(score);
            console.log("metrics", metrics)
            if (selectedModel?.method !== "CLUSTERING") {
                parameter = metrics.best_hyperparams;
                console.log("parameter", parameter)
            }
        } catch (e) {
            console.error("Failed to parse score:", e);
        }
    }
    if (shap) {
        try {
            shapVal = JSON.parse(shap);
            console.log("shapVal", shapVal);
            foto = shapVal.img_str;
            FeatureImportance = shapVal.feature_importance;

        } catch (e) {
            console.error("Failed to parse score:", e);
        }
    }

    const displayMetrics = (metrics) => {
        const keys = Object.keys(metrics);
        let displayKeys = null;
        if (selectedModel?.method === "CLUSTERING") {
            displayKeys = keys;
        } else if (selectedModel?.method === "CLASSIFICATION") {
            displayKeys = keys.slice(0, 4);
        } else {
            displayKeys = keys.slice(0, 3);
        }
        return displayKeys.map(key => (
            <tr key={key}>
                <td className="px-4 py-2 border-b">{key}</td>
                <td className="px-4 py-2 border-b">{metrics[key]}</td>
            </tr>
        ));
    };
    // console.log("metrics",metrics);
    // console.log("foto",importance);
    return (
        <>
            <Seo title={`${workspaceName} - AutoML`} />
            <div className="h-full flex flex-col">
                <div className="flex items-center">
                    <div className="flex-1">
                        <Breadcrumb links={[
                            { label: workspaceName },
                            { label: "AutoML", href: "/workspace/" + workspaceName + "/automl" },
                            { label: autoMLName, href: "/workspace/" + workspaceName + "/automl" + "/newProject" + "/modelling/" + autoMLName },
                            { label: "Explainability", href: router.asPath },
                        ]} active={"Explainability"} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 my-5">
                    <h1>{projectTitle}</h1>
                </div>
                <div className="flex flex-col gap-6">
                    <h2>Explainability for {name}</h2>

                    <h3>Model Metrics</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Metrics</th>
                                    <th className="px-4 py-2 border-b">Score</th>
                                </tr>
                            </thead>
                            {selectedModel?.method === "CLUSTERING" ? (
                                <tbody>

                                    <tr >
                                        <td className="px-4 py-2 border-b">Silhoutte Score</td>
                                        <td className="px-4 py-2 border-b">{score}</td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                {metrics && displayMetrics(metrics)}
                            </tbody>
                            )}
                        </table>
                    </div>

                    <h3>Used Parameter</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Parameter</th>
                                    <th className="px-4 py-2 border-b">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parameter && Object.entries(parameter).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="px-4 py-2 border-b">{key}</td>
                                        <td className="px-4 py-2 border-b">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <div>
                            <h3 className="my-3">Shapley Plot</h3>
                            <img src={`data:image/png;base64,${foto}`} alt="SHAP Summary Plot" />
                        </div>
                    </p>

                    <h3>Top Important Features on Target</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Feature</th>
                                    <th className="px-4 py-2 border-b">Importance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FeatureImportance && Object.entries(FeatureImportance).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="px-4 py-2 border-b">{key}</td>
                                        <td className="px-4 py-2 border-b">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    );
};

export default explain;