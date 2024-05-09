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


const preprocess = () => {
    
    const router = useRouter();

    let searchParams = useSearchParams();   
    let type = searchParams.get("type");

    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");

    const { datasets, addDataset } = useDatasets(workspaceName, username, type);
    const [isUploading, setIsUploading] = useState(false); 

    const back = () => {
        router.push(`/workspace/${workspaceName}/automl/preprocess?type=${type}`);
    };

    const next = () => {
        router.push(`/workspace/${workspaceName}/automl/target?type=${type}`)  ;
    }; 

    return (
        <>
        <Seo title={`${workspaceName} - AutoML`} />
            <div className="flex">
                <SidebarAuto />
                <PreprocessPage />
                <div className="h-full flex flex-col">
                        <div className="flex items-center">
                            <Button onClick={next} className="flex items-center gap-1">
                                    <div className="flex font-semibold items-center gap-1">
                                        Next
                                    </div>
                            </Button> 
                        </div>
                        <div className="flex items-center">
                            <Button onClick={back} className="flex items-center gap-1">
                                            <div className="flex font-semibold items-center gap-1">
                                                Back
                                            </div>
                            </Button>

                        </div>
                            </div>
                            </div>
        </>
    );
};

export default preprocess;