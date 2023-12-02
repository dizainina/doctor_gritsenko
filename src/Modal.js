import React from 'react';
import './index.css';

// компонента принимает пропсы active - отвечает, видна компонента или нет, и функция, которое это состояние изменяет

// делаем этот компонент ПЕРЕИСПОЛЬЗУЕМЫМ children


const Modal = ({active, setActive, children, id}) => {
    return (
        // вешаем обработчик, который будет менять состояние active на false (при нажатии на затемненную облать будет закрываться)
        // добавляем класс modal-post.active динамически с проверкой
        <div className={active ? "modal-post active" : "modal-post"} onClick={() => setActive(false)} id={id}>
        {/* чтобы не закрывалось при нажатии на контентную часть stopPropagation */}
            <div className={active ? "modal-post__content active" : "modal-post__content"} onClick={e => e.stopPropagation()}>
                {children}

        </div>

        </div>
    )
}

export default Modal;