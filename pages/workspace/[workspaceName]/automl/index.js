import Seo from "../../../../src/components/Seo";
import * as React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../../../src/components/Breadcrumb";
import Button from "../../../../src/components/Button/Button";
import Plus from "../../../../src/components/Icon/Plus";

const AutoML = () => {
    const router = useRouter();
    const { workspaceName } = router.query;
    
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
            <div className="flex justify-between items-center mb-6">
            <Button onClick={()=>{
                handleNewProject();
            }}>
              <div className="flex font-semibold items-center gap-1">
                    <Plus />
                    New Automated ML Job
              </div>
            </Button>
                <Button onClick={refreshJobs} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                    Refresh
                </Button>
            </div>
            <div className="flex-1 grid place-items-center">
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/LumbaEmpty.svg" alt="No Datasets Found" className="w-[280px]" />
              <div className="flex flex-col gap-4 mt-8 items-center">
                <h1 className="font-medium">No recent Automated ML jobs to display</h1>
                <span>Click “New Automated ML Job” to create your first ML job</span>
              </div>
            </div>
          </div>
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
