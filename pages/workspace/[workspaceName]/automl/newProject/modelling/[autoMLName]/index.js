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



const modelling = ({fetchedAutoML}) => {
    
    const router = useRouter();
    const { autoMLName, workspaceName } = router.query;
    const searchParams = useSearchParams();
    const username = useCookie("username");
    const type = searchParams.get("type");
    const { autoMLData, appendAutoMLData } = useContext(AutoMLContext);
    const { autoMLs, addAutoML } = useAutoML(workspaceName, username, type);
    // get autoMLs with the same name as autoMLName
    const selectedAutoML = autoMLs.find((autoML) => autoML.name === autoMLName);
    console.log("testyaa",selectedAutoML)
    const selectedModels = selectedAutoML?.automlmodels || [];

    const {autoModels} = useModels({ username, workspace: workspaceName, type, automlname: autoMLName, datasetname: selectedAutoML?.datasetname});
    console.log("111",autoMLName, autoModels)
    for (let [key,value] of autoMLData.entries()) {
        console.log("test",key,value)
    }
    console.log("222",autoMLData)

    const projectTitle = autoMLName ? `${autoMLName} Project` : "AutoML Project";
    const sortedModels = selectedModels?.sort((a, b) => b.score - a.score) || [];
    // const handleFormData = (data) => {
    //     setFormData(data);
    // };

    // const back = () => {
    //     router.push(`/workspace/${workspaceName}/automl/newProject/upload?type=${type}`);
    // };

    // const next = () => {
    //     router.push(`/workspace/${workspaceName}/automl/newProject/target?type=${type}`);
    //     axios
    //         .post(`${process.env.NEXT_PUBLIC_API_ROUTE}/preprocess/handle/`, body)
    //         .then((res) => {
    //             setDataset(res.data);
    //         })
    // };

    return (
        <>
            <Seo title={`${workspaceName} - AutoML`} />
            <div className="h-full flex flex-col">
                <div className="flex items-center">
                    <div className="flex-1">
                        <Breadcrumb links={[
                            { label: workspaceName },
                            { label: "AutoML", href: "/workspace/" + workspaceName + "/automl" },
                            { label: projectTitle, href: router.asPath },
                        ]} active={projectTitle} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 my-6">
                    <h1>{projectTitle}</h1>
                </div>

                {selectedModels?.length > 0 ? (
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
                            {sortedModels.map((model) => (
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

                )}
            </div>
        </>
    );
};

export default modelling;