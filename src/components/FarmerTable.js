import { TablePagination } from "@mui/material";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FarmerTable({ data }) {
  const [rows, setRows] = useState(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full pt-10 rounded-lg">
      <table className="text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-black bg-white">
          <tr className="border-b border-gray-300">
            <th scope="col" className="py-3 px-6 w-96">
              Name
            </th>
            <th scope="col" className="py-3 px-6 w-48 text-center">
              Reg NO
            </th>
            <th scope="col" className="py-3 px-6 w-48 text-center">
              Sub District
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <div>
              <p className="py-5 text-sm text-center text-red-600">
                {" "}
                No Record found
              </p>
            </div>
          ) : (
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((farmer) => {
                return (
                  <tr
                    key={farmer.name}
                    className="bg-white hover:bg-gray-50 text-black border-b"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black whitespace-nowrap"
                    >
                      <span className="px-4 py-2 rounded-full border border-[#0047BB] text-gray-700 hover:text-white font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 hover:bg-[#0047BB] transition duration-300 ease">
                        {farmer.name}
                      </span>
                    </th>
                    <td className="py-4 px-6 text-center">
                      {farmer.regno ? farmer.regno : "-"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {farmer.subdistrict ? farmer.subdistrict : "-"}
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
      {rows.length === 0 ? null : (
        <TablePagination
          className="float-right pb-10"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}

export default FarmerTable;
