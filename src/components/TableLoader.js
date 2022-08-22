import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TableLoader() {
  const skeletonArray = Array(4).fill("");
  return (
    <div className="w-full pt-10 rounded-lg block">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {skeletonArray.map((item) => {
            return (
              <tr className="bg-white hover:bg-gray-50 text-black border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-black whitespace-nowrap"
                >
                  <Skeleton width={250} />
                </th>
                <td className="py-4 px-6 text-center">
                  <Skeleton width={150} />
                </td>
                <td className="py-4 px-6 text-center">
                  <Skeleton width={150} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableLoader;
