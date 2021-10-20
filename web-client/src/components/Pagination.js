
const Pagination = (props) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {
          [...Array(props.totalPages)].map((page, i) => {
            return (
              <li className={i === props.currentPage ? 'page-item active' : 'page-item'}>
                <button
                  className="page-link"
                  onClick={() => props.changePage(i)}
                >{i + 1}</button>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default Pagination;