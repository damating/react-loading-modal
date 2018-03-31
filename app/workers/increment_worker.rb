class IncrementWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    total 0
    i = 0
    while i <= 100
      sleep 1
      i += 1
      total i
    end
  end
end
