import React, { useEffect, useState } from "react";

export default function Results({ resultList, searchName, isActive }) {
  // const [data, setData] = useState("huh");
  // const results = [];
  // const processData = async () => {
  //   if (resultList) {
  //     for (const i in resultList.data) {
  //       results[i] = resultList.data[i];
  //     }
  //   }
  // };

  // setSearchData(searchData);
  // console.log(searchData);
  // useEffect(() => {
  //   console.log(resultList["data"]);
  //   resultList && resultList["data"].map((item, idx) => console.log(item, idx));
  // });

  // render() {
  //   tracks =
  // }

  return (
    <React.Fragment>
      {/* <div className="resultCon">
        hmm
        {resultList &&
          resultList["data"].map((item, idx) => <div key={idx}>{item}</div>)}
      </div> */}
      <div>{isActive ? "ok" : "no"}</div>
      {/* <div className="resultCon">{!searchData || data}</div> */}
    </React.Fragment>
  );
}
