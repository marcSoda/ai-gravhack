FROM node:20

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        git \
        curl \
        zip \
        wget \
        sudo \
        vim \
        procps \
        tmux && \
    apt-get clean all

# add a user with sudo permissions
RUN echo 'node ALL=(ALL) NOPASSWD: ALL' | tee /etc/sudoers.d/node
USER node

WORKDIR /working
# COPY dotfiles/ /home/node
