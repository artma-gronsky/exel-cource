const CODES = {
  A: 65,
  Z: 90,
};

function createCell(val) {
  return `<div class="cell" contentEditable>${val}</div>`;
}

function createCol(char) {
  return `  <div class="column">
                        ${char}
                    </div>`;
}

function createRow(content, info = '') {
  return `<div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${content}</div>
           </div>`;
}

export function createTable(rowCount = 100) {
  const colsCount = CODES.Z - CODES.A +1;
  const rows = [];

  const cols = new Array(colsCount).fill('')
      .map((value, index) => String.fromCharCode(CODES.A + index))
      .map(createCol)
      .join('');

  rows.push(createRow(cols))

  const cells = new Array(colsCount).fill('')
      .map(createCell)
      .join('');

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i+1))
  }

  return rows.join('');
  // return `
  //      <div class="row" >
  //               <div class="row-info">
  //
  //               </div>
  //
  //               <div class="row-data">
  //                   <div class="column">
  //                       A
  //                   </div>
  //                   <div class="column">
  //                       B
  //                   </div>
  //                   <div class="column">
  //                       C
  //                   </div>
  //                   <div class="column">
  //                       D
  //                   </div>
  //                   <div class="column">
  //                       E
  //                   </div>
  //               </div>
  //           </div>
  //           <div class="row">
  //               <div class="row-info">
  //                   1
  //               </div>
  //
  //               <div class="row-data">
  //                   <div class="cell selected" contenteditable>temp1</div>
  //                   <div class="cell" contenteditable>temp2</div>
  //                   <div class="cell" contenteditable>temp3</div>
  //               </div>
  //           </div>
  //           <div class="row">
  //               <div class="row-info">
  //                   2
  //               </div>
  //
  //               <div class="row-data">
  //                   <div class="cell">A2</div>
  //                   <div class="cell">B2</div>
  //                   <div class="cell">C3</div>
  //               </div>
  //           </div>
  //           <div class="row">
  //               <div class="row-info">
  //                   3
  //               </div>
  //
  //               <div class="row-data">
  //                   <div class="cell">temp1</div>
  //                   <div class="cell">temp2</div>
  //                   <div class="cell">temp3</div>
  //               </div>
  //           </div>
  //   `;
}
