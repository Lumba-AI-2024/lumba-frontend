import Seo from "../../../../src/components/Seo";
import * as React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../../../src/components/Breadcrumb";
import Button from "../../../../src/components/Button/Button";
import Plus from "../../../../src/components/Icon/Plus";
import AutoMLPage from "../../../../src/components/Tutorial/AutoML/AutoMLPage";
const AutoML = () => {
    const router = useRouter();
    const { workspaceName } = router.query;
    // route to new-project.js
    
    const handleNewProject = () => {
      router.push(`/workspace/${workspaceName}/automl/new-project`);
    };

    const refreshJobs = () => {
        console.log("Refreshing ML job list...");
    };

    return (
        <>
        <Seo title={`${workspaceName} - AutoML`} />
        <Breadcrumb links={[{ label: workspaceName }, { label: "AutoML", href: router.asPath }]} active={"AutoML"} />
        <div className="flex flex-col gap-6 my-6">
            <h1 className="text-2xl font-bold mb-4">Automated ML</h1>
          <AutoMLPage />
            {/* <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Recent Automated ML Jobs
                  </h3>
              </div>
              <div className="border-t border-gray-200">
                  <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Job status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              No recent Automated ML jobs to display
                          </dd>
                      </div>
                  </dl>
              </div>
              <div className="border-t border-gray-200">
              <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                              Job status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              No recent Automated ML jobs to display
                          </dd>
                      </div>
                  </dl>
              </div>
            </div> */}
        </div>


        </>
    );
}

export default AutoML;
