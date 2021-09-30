import React, { useEffect, useState } from "react";

export default function Results({ searchData }) {
  // const [data, setSearchData] = useState("");
  // const processData = async (dump) => {
  //   for (const i in dump) {
  //     console.log(i);
  //   }
  // };

  // console.log(searchData);
  // useEffect(() => {
  //   setSearchData(processData(searchData));
  // }, [searchData]);

  return (
    <React.Fragment>
      <div className="resultCon">hmm{searchData}</div>
      {/* <div className="resultCon">{!searchData || data}</div> */}
    </React.Fragment>
  );
}
