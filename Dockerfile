FROM ubuntu:20.04
MAINTAINER TheBotlyNoob <thebotlynoob@gmail.com>

# Become the root user
USER root

# Update, so that we can install the packages
RUN cd /app/ \
  && apt-get update -q \
  # Install curl (I thought this was installed by default, but I guess not)
  && apt-get install -yq curl git \
  # Get latest version of node 16
  && curl -sSL https://deb.nodesource.com/setup_16.x | bash  \
  # Install Nodejs, and npm
  && apt-get install -qy nodejs \
  # Inititate, and update the submodules
  && git clone https://github.com/TheBotlyNoob/website . \
  && git submodule init \
  && git submodule update \
  # Install packages
  && npm install \
  # Build the website
  && npm run build

# Run: npm run production, after build 
ENTRYPOINT cd /app/ && npm run serve -- --port "$PORT" --host 0.0.0.0
