class LoadingController < ApplicationController
  def index
  end

  def run_worker
    job_id = ::IncrementWorker.perform_async

    render json: { job_id: job_id }, status: 200
  end

  def status
    worker_data = Sidekiq::Status::get_all params[:job_id]

    render json: {
      recalculating: worker_data["status"] != "complete",
      progress: worker_data["total"]
    }, status: 200
  end
end
