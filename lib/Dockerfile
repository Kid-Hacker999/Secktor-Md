FROM quay.io/kid-hacker999/secktor
RUN git clone https://github.com/kid-hacker999/secktor-md /root/kid-hacker999
WORKDIR /root/kid-hacker999/
RUN yarn install --network-concurrency 1
CMD ["node", "lib/client.js"]

