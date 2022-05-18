library(dslabs)
data(heights)
options(digits = 3)    # report 3 significant digits for all answers


str(heights)
ind <- heights$height > mean(heights$height)
ind
sum(ind)

# Question 2

ind <- heights$height > mean(heights$height) & heights$sex == "Female"

sum(ind)

# Question 3

mean(heights$sex == "Female")

# Question 4 a

min(heights$height)

# Question 4 b

match(50,heights$height)

#question 4 c

heights$sex[match(50,heights$height)]

#question 5 a

max(heights$height)

#question 5 b

x <- 50:82 
x
#question 5 c
sum(!(x %in% heights$height))

#question 6 a

heights <- mutate(heights, ht_cm = height*2.54)
head(heights)

heights$ht_cm[18]

# question 6 b

mean(heights$ht_cm)

# question 7 a

females <- filter(heights, sex=="Female")
nrow(females)

# question 7 b

mean(females$ht_cm)

# question 8

data(olive)
head(olive)

palmitic_acid <- olive$palmitic
palmitoleic_acid <- olive$palmitoleic
plot(palmitic_acid,palmitoleic_acid)

# question 9

hist(olive$eicosenoic)


#question 10

boxplot(palmitic ~ region, data = olive)
