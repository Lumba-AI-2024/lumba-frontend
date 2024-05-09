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
import DatasetPage from "../../../../../src/components/Tutorial/Dataset/DatasetPage";


const upload = () => {
    
    const router = useRouter();

    let searchParams = useSearchParams();   
    let type = searchParams.get("type");

    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");

    const { datasets, addDataset } = useDatasets(workspaceName, username, type);
    const [isUploading, setIsUploading] = useState(false); 

    const back = () => {
        router.push(`/workspace/${workspaceName}/automl?type=${type}`);
    };


    return (
        <>
        <Seo title={`${workspaceName} - AutoML`} />
            <div className="flex">
                <SidebarAuto />
                <div className="flex-1 p-8">  {/* Adjusted padding and flex-grow */}
                    <Breadcrumb links={[
                        { label: workspaceName }, 
                        { label: "AutoML", href: "/workspace/" + workspaceName + "/automl" },
                        { label: "new project", href: router.asPath }
                    ]} active={"AutoML"} />
                    <div className="flex flex-col gap-6 my-6">
                        <h1>Create a new automated ML Job</h1>
                    </div>
                    <div className="h-full flex flex-col">
                        <div className="flex items-center">
                            <FormModalContextProvider>
                                <UploadFile
                                    buttonLabel={
                                        <div className="flex font-semibold items-center gap-1">
                                            <Plus />
                                            Upload
                                        </div>
                                    }
                                    formLabel="Upload File Datasets"
                                    handleSubmit={ async (formData) => {
                                        setIsUploading(true);
                                        const dataset = new FormData();
                                        dataset.append("file", formData?.file);
                                        dataset.append("name", formData?.file["name"]);
                                        dataset.append("username", username);
                                        dataset.append("workspace", workspaceName);
                                        dataset.append("type", type);
                                        try {
                                          // Wait for the addDataset function to complete
                                          await addDataset(dataset);
                                          // If successful, reset the uploading state and navigate
                                          setIsUploading(false);
                                          router.push(`/workspace/${workspaceName}/automl/newProject/preprocess?type=${type}`);
                                        } catch (error) {
                                            // Handle errors if the upload fails
                                            console.error('Upload failed:', error);
                                            setIsUploading(false);
                                            // Optionally, set error messages or state here
                                        }
                                    }}
                                    workspaceType={type}
                                />
                            </FormModalContextProvider>
                        </div>
                        <div className="flex items-center my-6">
                            <Button onClick={back} className="flex items-center gap-1">
                                <div className="flex font-semibold items-center gap-1">
                                    Back
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default upload;