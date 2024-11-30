import React from 'react';

interface Props {
  tableStructure: {
    heading: any;
    load: (rowData: any) => any;
  }[];
  data: any[];
}

const DynamicTable = ({ tableStructure, data = [] }: Props) => {
  return (
    <table id="mama_approved" className="table table-striped">
      <thead>
        <tr>
          {tableStructure.map(({ heading }, index) => (
            <th
              key={index}
              style={{
                borderRight: 1,
                borderRightColor: '#dee2e6',
                borderRightStyle: 'solid',
                borderBottomWidth: 0,
              }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Example Data */}
        {data?.map((client, index) => (
          <tr key={index}>
            {tableStructure?.map((column, j) => (
              <td
                key={`${index}-${j}`}
                style={{
                  borderRight: 1,
                  borderRightColor: '#dee2e6',
                  borderRightStyle: 'solid',
                  borderBottomWidth: 0,
                }}
              >
                {column.load(client)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
