Rails.application.routes.draw do
  root to: 'loading#index'
  get 'loading/run_worker', to: 'loading#run_worker'
  get 'loading/status/:job_id', to: 'loading#status'
end
