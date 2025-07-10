FROM ubuntu:22.04

# Set the timezone
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update the repository and install git, and other dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        software-properties-common \
        git \
        curl \
        zip \
        wget \
        sudo \
        ncurses-bin \
        python3 \
        python3-venv \
        python3-dev \
        tzdata \
        python3-pip \
        pkg-config \
        libpq-dev \
        vim \
        procps \
        tmux && \
    apt-get clean all

# add a user with sudo permissions
RUN addgroup --gid 1000 dockerusergroup && \
    adduser --uid 1000 --gid 1000 --home /home/dockeruser --disabled-password --gecos "" dockeruser && \
    # add dockeruser to sudo group
    usermod -aG sudo dockeruser && \
    # allow dockeruser to use sudo without password
    echo 'dockeruser ALL=(ALL) NOPASSWD: ALL' | tee /etc/sudoers.d/dockeruser
USER dockeruser

# Set the working directory
WORKDIR /working
# copy dotfiles to dockeruser home directory. remove this line if you do not have dotfiles or the build process will fail
# COPY dotfiles/ /home/dockeruser/
