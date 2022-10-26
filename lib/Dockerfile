FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Kid-Hacker999/Secktor-Md /root/Kid-Hacker999
WORKDIR /root/Kid-Hacker999/
RUN yarn install --network-concurrency 1
CMD ["node", "lib/client.js"]
