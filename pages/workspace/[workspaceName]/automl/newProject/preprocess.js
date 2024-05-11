import { useState } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../../../../src/components/Breadcrumb";
import FormModalContextProvider from "../../../../../src/context/FormModalContext";
import Plus from "../../../../../src/components/Icon/Plus";
import UploadFile from "../../../../../src/components/Form/UploadFile";
import Dataset from "../../../../../src/components/Dataset";
import useDatasets from "../../../../../src/hooks/useDatasets";
import useCookie from "../../../../../src/hooks/useCookie";
import { useSearchParams } from "next/navigation";
import Seo from "../../../../../src/components/Seo";
import Button from "../../../../../src/components/Button/Button";
import SidebarAuto from "../../../../../src/components/SidebarAuto";
import CheckData from "../../../../../src/components/CheckData";
import PreprocessPage from "../../../../../src/components/Tutorial/AutoML/PreprocessPage";
import axios from "axios";



const preprocess = () => {

    const router = useRouter();

    let searchParams = useSearchParams();
    let type = searchParams.get("type");

    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");

    const { datasets, addDataset } = useDatasets(workspaceName, username, type);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [dataset, setDataset] = useState(null);


    const handleFormData = (data) => {
        setFormData(data);
    };
    console.log("cobayaa", formData);

    const back = () => {
        router.push(`/workspace/${workspaceName}/automl/newProject/upload?type=${type}`);
    };

    const next = () => {
        // router.push(`/workspace/${workspaceName}/automl/newProject/target?type=${type}`);
        // axios
        //     .post(`${process.env.NEXT_PUBLIC_API_ROUTE}/preprocess/clean/`, formData)
        //     .then((res) => {
        //         setDataset(res.data);
        //     })
    };

    return (
        <>
            <Seo title={`${workspaceName} - AutoML`} />
            <div className="flex">
                <SidebarAuto />
                <div className="container">
                    <PreprocessPage onFormDataChange={handleFormData} />
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-1">
                            <Button onClick={back} className="flex items-center gap-1">
                                <div className="flex font-semibold items-center gap-1">
                                    Back
                                </div>
                            </Button>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button onClick={next} className="flex items-center gap-1">
                                <div className="flex font-semibold items-center gap-1">
                                    Start Training
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default preprocess;