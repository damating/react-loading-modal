require 'sidekiq'
require 'sidekiq-status'

Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://localhost:6379' }

  Sidekiq::Status.configure_server_middleware config, expiration: 30.minutes
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://localhost:6379' }

  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end
