library(dslabs)
data(murders)

index <- which(murders$state == "Massachusetts")

murder_rate <- ((murders$total) / (murders$population)) * 100

murder_rate

murder_rate[index]

index2 <- match(c("New York", "Florida", "Texas"), murders$state)

murders$state[index2]
murder_rate[index2]


x <- c("a", "b", "c", "d", "e")
y <- c("a", "d", "f")
y %in% x

c("Boston", "Dakota", "Washington") %in% murders$state
