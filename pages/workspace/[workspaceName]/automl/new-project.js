import React, { useState } from 'react';
import Router from 'next/router';
import UploadFile from '../../../../src/components/Form/UploadFile';
import Seo from '../../../../src/components/Seo';
import Breadcrumb from '../../../../src/components/Breadcrumb';
import { useRouter } from 'next/router';

const NewProject = () => {
    const router = useRouter();
    const { workspaceName } = router.query;
    const [file, setFile] = useState(null);

    const handleSubmit = (formData) => {
        console.log(formData); // Process formData or perform API submission
        Router.push('/next-step'); // Redirect to the next step after upload
    };

    return (
        <>
        <Seo title={`${workspaceName} - AutoML`}  />
        <Breadcrumb links={[
            { label: workspaceName }, 
            { label: "AutoML", href: "/workspace/" + workspaceName + "/automl"  },
            { label: "new project", href: router.asPath }
            ]} 
            active={"AutoML"} />
        <div className="flex flex-col gap-6 my-6">
          <h1>Create a new automated ML Job</h1>
        </div>
        <div>
            <UploadFile onFileUpload={setFile} onSubmit={handleSubmit} uploadType={"auto"}/>
        </div>
        </>
    );
};

export default NewProject;