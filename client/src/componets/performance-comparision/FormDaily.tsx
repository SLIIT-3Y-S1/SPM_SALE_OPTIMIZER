import React from "react";

const FormDaily = () => {
  return (
    <div >
      <form className="mt-5">
        <div>
          <label className="mr-5">Set comparision date A</label>
          <input
            type="date"
            className="text-base border border-gray-300 rounded-md"
          />
          <label className="ml-5 mr-5">Set comparision date B</label>
          <input
            type="date"
            className="text-base border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-md"
        >
          Compare
        </button>
      </form>
    </div>
  );
};

export default FormDaily;
