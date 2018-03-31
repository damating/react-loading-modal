import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modal = document.getElementById('modal');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modal.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modal.removeChild(this.el);
  }

  formattedModal() {
    return <div className="modal-dialog">
             <div className='modal-content'>
               {this.props.children}
             </div>
             <div className="footer">
               <button>Close</button>
             </div>
           </div>
  }

  render() {
    let formattedModal = this.formattedModal();
    return ReactDOM.createPortal(
      formattedModal,
      this.el,
    );
  }
}
