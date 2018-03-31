import React from 'react';
import axios from 'axios';

import Button from './common/components/Button';
import LoadingModal from './common/components/LoadingModal';

export default class JobManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      percentageProgress: 0
    }

    this.jobId = null;
    this.runBackgroundJob = this.runBackgroundJob.bind(this);
    this.toogleModal = this.toogleModal.bind(this);
    this.checkWorkerInInterval = this.checkWorkerInInterval.bind(this);
    this.checkWorker = this.checkWorker.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toogleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  checkWorker() {
    let jobId = this.jobId;

    axios.get(`/loading/status/${jobId}`).then(response => {
      if(response.data.recalculating === true) {
        this.setState({ percentageProgress: parseInt(response.data.progress)})
      } else {
        this.toogleModal();
        clearInterval(this.interval);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  runBackgroundJob() {
    const self = this;

    axios.get('/loading/run_worker')
    .then(function (response) {
      self.jobId = response.data.job_id;
      self.toogleModal();
      self.checkWorkerInInterval(self.props.intervalDuration);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkWorkerInInterval(interval) {
    this.interval = setInterval(() => {
      this.checkWorker();
    }, interval);
  }

  render() {
    return (
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Track status of your background job</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <Button label="Run job"
                    buttonClass="btn btn-primary my-2"
                    disabled={this.state.isModalOpen}
                    onClick={this.runBackgroundJob} />
          </p>
          <LoadingModal isOpen={this.state.isModalOpen}
                        percentageProgress={this.state.percentageProgress} />
        </div>
      </section>
    );
  }
}

JobManager.defaultProps = {
  intervalDuration: 1000
}
