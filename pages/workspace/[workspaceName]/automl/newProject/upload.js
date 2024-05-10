import { useContext, useState } from "react";
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
import FormModal from "../../../../../src/components/Form/FormModal";
import HiddenInput from "../../../../../src/components/Form/HiddenInput";
import Input from "../../../../../src/components/Form/Input";
import Select from "../../../../../src/components/Select/Select";
import * as React from "react";
import { FormModalContext } from "../../../../../src/context/FormModalContext";


const upload = () => {

    const router = useRouter();
    const { formData } = React.useContext(FormModalContext);

    let searchParams = useSearchParams();
    let type = searchParams.get("type");

    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);
    const username = useCookie("username");

    const { datasets, addDataset } = useDatasets(workspaceName, username, type);
    const [isUploading, setIsUploading] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [dataset, setDataset] = useState(formData?.dataset);
    

    const back = () => {
        router.push(`/workspace/${workspaceName}/automl?type=${type}`);
    };

    const next = () => {
        router.push(`/workspace/${workspaceName}/automl/newProject/preprocess?type=${type}&checkedDataset=${dataset}`);
    };

    React.useEffect(() => {
        if (formData?.dataset) {
            setDataset(formData?.dataset);
            // setIsChecked(true);
            console.log(formData?.dataset); // Log the dataset if it changes
        }
    }, [formData]); 

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
                    <div className="vertical-form-container">
                        <HiddenInput name="username" defaultValue={username} />

                        <div className="form-field">
                            <Input label={"Name"} name={"name"} placeholder="AutoML job name" required />
                        </div>

                        <div className="form-field">
                            <Input
                                label={"Description"}
                                name={"description"}
                                placeholder="Write description here"
                                textarea={true}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <p className="form-label">Will Be Used For</p>
                            <Select
                                name="autoMlType"
                                placeholder="- Select -"
                                items={[
                                    { label: "Classification", value: "classification" },
                                    { label: "Regression", value: "regression" },
                                    { label: "Clustering", value: "clustering" },
                                ]}
                            />
                        </div>
                        <h4 className="mt-4">Please choose one either to upload or select dataset</h4>
                        <FormModalContextProvider>
                            <div className="mt-4 form-field upload-field">
                                <UploadFile
                                    buttonLabel={
                                        <div className="flex font-semibold items-center gap-1">
                                            <Plus />
                                            Upload
                                        </div>
                                    }
                                    formLabel="Upload File Datasets"
                                    handleSubmit={async (formData) => {
                                        setIsUploading(true);
                                        const dataset = new FormData();
                                        dataset.append("file", formData?.file);
                                        dataset.append("username", username);
                                        dataset.append("workspace", workspaceName);
                                        dataset.append("type", type);
                                        try {
                                            await addDataset(dataset);
                                            setIsUploading(false);
                                            setIsChecked(true);
                                            setDataset(formData?.file["name"]);
                                            console.log(formData?.file["name"]);
                                            // router.push(`/workspace/${workspaceName}/automl/newProject/preprocess?type=${type}`);
                                        } catch (error) {
                                            console.error('Upload failed:', error);
                                            setIsUploading(false);
                                        }
                                    }}
                                    workspaceType={type}
                                />
                            </div>
                        </FormModalContextProvider>
                        <div className="mt-4 flex gap-3 items-center">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="font-semibold">Select Dataset</span>
                                <Select
                                    isDisabled={isChecked}
                                    variant="withoutBorder"
                                    placeholder="Select dataset..."
                                    name="dataset"
                                    items={datasets?.map((dataset) => ({ value: dataset.name, label: dataset.name })) || []}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="mr-4 flex items-center gap-1">
                            <Button onClick={back} className="flex items-center gap-1">
                                <div className="flex font-semibold items-center gap-1">
                                    Back
                                </div>
                            </Button>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button onClick={next} className="flex items-center gap-1">
                                <div className="flex font-semibold items-center gap-1">
                                    Next
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