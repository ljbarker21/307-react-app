function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    if(props.characterData === undefined) return null;
    const rows = props.characterData.map((row, index) => {
        return (
        <tr key={index}>
            <td>{row._id}</td>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
                <button onClick={() => props.removeOneCharacter(index)}>
                Delete
                </button>
            </td>
        </tr>
        );
       }
      );
      return (
          <tbody>
            {rows}
           </tbody>
       );
  }
  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody 
        characterData={props.characterData}
        removeOneCharacter={props.removeOneCharacter}
        />
      </table>
    );
}

export default Table;