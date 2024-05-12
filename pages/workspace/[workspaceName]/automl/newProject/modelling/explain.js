import { useState } from "react";
import { useRouter } from "next/router";
// import Breadcrumb from "../../../../../src/components/Breadcrumb";
// import FormModalContextProvider from "../../../../../src/context/FormModalContext";
// import Plus from "../../../../../src/components/Icon/Plus";
// import UploadFile from "../../../../../src/components/Form/UploadFile";
// import Dataset from "../../../../../src/components/Dataset";
import useDatasets from "../../../../../../src/hooks/useDatasets";
import { useSearchParams } from "next/navigation";
import Seo from "../../../../../../src/components/Seo";
// import CheckData from "../../../../../src/components/CheckData";
import useCookie from "../../../../../../src/hooks/useCookie";
import Model from "../../../../../../src/components/Model";
import useModels from "../../../../../../src/hooks/useModels";
import Breadcrumb from "../../../../../../src/components/Breadcrumb";
// import axios from "axios";



const explain = () => {
    const router = useRouter();
    const { workspaceName } = router.query;

    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    const username = useCookie("username");
    const { models, mutate } = useModels({ username, workspace: workspaceName, type });
    return (
        <>
            <Seo title={`${workspaceName} - AutoML`} />
            <div className="h-full flex flex-col">
                <div className="flex items-center">
                    <div className="flex-1">
                        <Breadcrumb links={[
                            { label: workspaceName },
                            { label: "AutoML", href: "/workspace/" + workspaceName + "/automl" },
                            { label: "Modelling", href: "/workspace/" + workspaceName + "/automl" + "/newProject" + "/modelling"},
                            { label: "Explainability", href: router.asPath },
                        ]} active={"Explainability"} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 my-6">
                    <h1>AutoML Title Project</h1>
                </div>
                <div className="flex flex-col gap-6 my-6">
                    <h2>Explainability</h2>
                    <h3>Shapley Plot for Combination</h3>
                    <p>
                        [foto shapley]
                    </p>

                    <h3>Top Important Features on Target</h3>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                </div>

                {/* {models?.length > 0 ? (
                    <table className="mt-4">
                        <thead>
                            <tr>
                                <th className="px-4">Dataset & Model Name</th>
                                <th className="px-4">Metric & Score</th>
                                <th className="px-4">Method & Algorithm</th>
                                <th className="px-4">Train Date</th>
                                <th className="px-4">Actions</th>
                                <th className="px-4">Explainability</th>
                            </tr>
                            <tr className="border-b border-gray/50">
                                <td colSpan="100%" className="pt-4"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map((model) => (
                                <Model username={username} workspace={workspaceName} key={model.id} isAuto={true} {...model} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex-1 grid place-items-center">
                        <div className="flex flex-col items-center justify-center">
                            <img src="/assets/LumbaEmpty.svg" alt="No Datasets Found" className="w-[280px]" />
                            <div className="flex flex-col gap-4 mt-8 items-center">
                                <h1 className="font-medium">No Models Found</h1>
                                <span>Create your model to train and test it here</span>
                            </div>
                        </div>
                    </div>

                )} */}
            </div>
        </>
    );
};

export default explain;