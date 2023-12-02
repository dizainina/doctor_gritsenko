import { useState, useEffect } from "react";
import "./index.css";
import data from "./comments.json";

export default function App() {
// текущая страница
  const [currentPage, setCurrentPage] = useState(1);
  // количество на странице элементов
  const [itemPerPage] = useState(4);
// индекс последнего элемента
  const indexOfLastItem = currentPage * itemPerPage;
// индекс первого элемента
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  // обрезаем количество выводимых элементов
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
// функция для смены страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
  
    <div className="App">
      <div className="commentsPopup-item">
      <h1>Отзывы моих пациентов</h1>
      <ul className="commentsFlex">
          {currentItems.map((item) => (
            <li key={item.id} >
            <div className="comm">
            <p className="text-under-comment">{item.name} <span className="gray">{item.date}</span></p>
              <p>{item.message}</p> 
            </div>

            </li>
            ))}
      </ul>
      </div>



      <div className="commentsPopup-navigation">
      {currentPage > 1 && (
      <a href="#" className="commentPagesPrev" onClick={() => paginate(currentPage-1)}>Предыдущая страница</a>
      )}
      {currentPage === 1 && (
      <a href="#" className={"commentPagesPrev no_active" ? "commentPagesPrev no_active" : "commentPagesPrev"}>Предыдущая страница</a>
      )}
        {data.length > itemPerPage && (
          <ul className="pages">
            {Array.from(
              { length: Math.ceil(data.length / itemPerPage) },
              (_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""} 
                >
                  <div className="page" >{index + 1}</div>
                </li>
              )
            )}
          </ul>
          
        )}
      {currentPage < Math.ceil(data.length / itemPerPage) && (
        <a href="#" className="commentPagesNext" onClick={() => paginate(currentPage+1)}>Следующая страница</a>
      )}
      {currentPage === Math.ceil(data.length / itemPerPage) && (
      <a href="#" className={"commentPagesNext no_active" ? "commentPagesNext no_active" : "commentPagesNext"}>Предыдущая страница</a>
      )}
        

      </div>
    </div>

  );
}