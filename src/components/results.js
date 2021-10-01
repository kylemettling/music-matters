import React, { useEffect, useState } from "react";

export default function Results({ resultList, searchName }) {
  // const [data, setData] = useState("huh");
  const results = [];
  const processData = async () => {
    if (resultList) {
      for (const i in resultList.data) {
        results[i] = resultList.data[i];
      }
    }
  };
  // setSearchData(searchData);
  // console.log(searchData);
  useEffect(() => {
    processData();
    console.log(results);
  });

  // render() {
  //   tracks =
  // }

  return (
    <React.Fragment>
      <div className="resultCon">hmm{(resultList, searchName)}</div>
      {/* <div className="resultCon">{!searchData || data}</div> */}
    </React.Fragment>
  );
}
