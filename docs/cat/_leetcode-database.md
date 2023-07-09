---
sidebar_position: 6
---

## Medium

### 行程和用户

[262. 行程和用户](https://leetcode.cn/problems/trips-and-users/)

```sql
SELECT t.Request_at AS Day,
       ROUND(SUM(CASE
                   WHEN t.Status = 'completed' THEN 0
                   ELSE 1
                 END) / COUNT(*),
             2) AS "Cancellation Rate"
  FROM Trips t
  JOIN Users u
    ON t.Client_Id = u.Users_Id
   AND u.Banned = 'No'
 WHERE t.Request_at BETWEEN '2013-10-01' AND '2013-10-03'
 GROUP BY t.Request_at
```

### 体育馆的人流量

[601. 体育馆的人流量](https://leetcode.cn/problems/human-traffic-of-stadium/)

```sql
SELECT DISTINCT a.* FROM stadium a, stadium b, stadium c
 WHERE a.people >= 100 AND b.people >= 100 AND c.people >= 100
   AND ((a.id = b.id - 1 AND b.id = c.id - 1) OR
       (a.id = b.id - 1 AND a.id = c.id + 1) OR
       (a.id = b.id + 1 AND b.id = c.id + 1))
 ORDER BY a.id
```

### 分数排名

[178. 分数排名](https://leetcode.cn/problems/rank-scores/)

```sql
SELECT Score,
       (SELECT COUNT(DISTINCT s2.Score)
          FROM Scores s2
         WHERE s2.Score >= s.Score) AS Rank
  FROM Scores s
 ORDER BY Score DESC

-- 这样写不通过？ 纳闷了
SELECT Score, DENSE_RANK() OVER(ORDER BY Score DESC) AS Rank FROM Scores;
```

### 部门工资前三高的员工

[185. 部门工资前三高的员工](https://leetcode.cn/problems/department-top-three-salaries/)

```sql
SELECT D.Name AS Department, E.Name AS Employee, E.Salary FROM Employee E
  JOIN Department D ON E.DepartmentId = D.Id
 WHERE (SELECT COUNT(DISTINCT(Salary)) FROM Employee
         WHERE DepartmentId = E.DepartmentId AND Salary > E.Salary) < 3
 ORDER BY E.DepartmentId, E.Salary DESC;
```

### 部门工资最高的员工

[184. 部门工资最高的员工](https://leetcode.cn/problems/department-highest-salary/)

```sql
SELECT d.Name AS Department, e.Name AS Employee, e.Salary
  FROM Department d
  JOIN Employee e
    ON d.Id = e.DepartmentId
   AND e.Salary = (SELECT MAX(Salary) FROM Employee WHERE DepartmentId = d.Id)
```

### 删除重复的电子邮箱

[196. 删除重复的电子邮箱](https://leetcode.cn/problems/delete-duplicate-emails/)

```sql
# MySQL
DELETE p1 FROM Person p1,
    Person p2
WHERE
    p1.Email = p2.Email AND p1.Id > p2.Id
```

## Easy

### 超过 5 名学生的课

[596. 超过 5 名学生的课](https://leetcode.cn/problems/classes-more-than-5-students/)

```sql
SELECT class FROM courses GROUP BY class HAVING COUNT(DISTINCT student) >= 5
```

### 第二高的薪水

[176. 第二高的薪水](https://leetcode.cn/problems/second-highest-salary/)

```sql
-- Oracle
SELECT NVL((SELECT Salary
             FROM (SELECT Salary, ROWNUM AS RN
                     FROM (SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC)
                    WHERE ROWNUM < 3)
            WHERE RN > 1),
           NULL) AS SecondHighestSalary
  FROM DUAL;

SELECT NVL((SELECT Salary
             FROM (SELECT DISTINCT Salary, DENSE_RANK() OVER(ORDER BY Salary DESC) AS RN
                     FROM Employee ORDER BY RN)
            WHERE RN = 2),
           NULL) AS SecondHighestSalary
  FROM DUAL;

# MySQL
SELECT IFNULL((SELECT DISTINCT Salary
                FROM Employee
               ORDER BY Salary DESC LIMIT 1 OFFSET 1),
              NULL) AS SecondHighestSalary
```

### 第 N 高的薪水

[177. 第 N 高的薪水](https://leetcode.cn/problems/nth-highest-salary/)

```sql
-- Oracle
CREATE FUNCTION getNthHighestSalary(N IN NUMBER) RETURN NUMBER IS
  result NUMBER;
BEGIN
  SELECT Salary
    INTO result
    FROM (SELECT salary, ROWNUM AS rn
            FROM (SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC))
   WHERE rn = N;
  RETURN result;
END;

# MySQL
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (
      SELECT IFNULL((SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT N,1),NULL)
  );
END
```

### 连续出现的数字

[180. 连续出现的数字](https://leetcode.cn/problems/consecutive-numbers/)

```sql
SELECT DISTINCT t.Num as ConsecutiveNums FROM Logs t
  JOIN Logs a ON t.Id + 1 = a.Id AND t.Num = a.Num
  JOIN Logs b ON t.Id - 1 = b.Id AND t.Num = b.Num
```

### 换座位

[626. 换座位](https://leetcode.cn/problems/exchange-seats/)

```sql
SELECT (CASE
         WHEN MOD(id, 2) = 0 THEN id - 1
         WHEN MOD(id, 2) = 1 AND id = (SELECT COUNT(*) FROM seat) THEN id
         ELSE id + 1
       END) AS id,
       student
  FROM seat ORDER BY id
```

### 上升的温度

[197. 上升的温度](https://leetcode.cn/problems/rising-temperature/)

```sql
-- Oracle
SELECT w2.id AS Id
  FROM weather w2
  JOIN weather w1
    ON w2.RecordDate - w1.RecordDate = 1
   AND w2.Temperature > w1.Temperature;

# MySQL
SELECT w2.id AS 'Id'
  FROM weather w2
  JOIN weather w1
    ON DATEDIFF(w2.RecordDate, w1.RecordDate) = 1
   AND w2.Temperature > w1.Temperature;
```

### 查找重复的电子邮箱

[182. 查找重复的电子邮箱](https://leetcode.cn/problems/duplicate-emails/)

```sql
SELECT Email FROM Person GROUP BY Email HAVING COUNT(*) > 1
```

### 从不订购的客户

[183. 从不订购的客户](https://leetcode.cn/problems/customers-who-never-order/)

```sql
SELECT c.Name AS Customers FROM Customers c WHERE NOT EXISTS (SELECT 1 FROM Orders WHERE CustomerId = c.Id)
```

### 组合两个表

[175. 组合两个表](https://leetcode.cn/problems/combine-two-tables/)

```sql
SELECT p.FirstName, p.LastName, a.City, a.State FROM Person p LEFT JOIN Address a ON p.PersonId = a.PersonId
```

### 超过经理收入的员工

[181. 超过经理收入的员工](https://leetcode.cn/problems/employees-earning-more-than-their-managers/)

```sql
SELECT e.Name AS Employee FROM Employee e JOIN Employee m ON e.ManagerId = m.Id AND e.Salary > m.Salary
```

### 大的国家

[595. 大的国家](https://leetcode.cn/problems/big-countries/)

```sql
SELECT name, population, area FROM World WHERE area > 3000000 OR population > 25000000
```

### 有趣的电影

[620. 有趣的电影](https://leetcode.cn/problems/not-boring-movies/)

```sql
SELECT id, movie, description, rating FROM cinema WHERE description != 'boring' AND MOD(id, 2) = 1 ORDER BY rating DESC
```

### 交换工资

[627. 交换工资](https://leetcode.cn/problems/swap-salary/)

```sql
-- 通用
UPDATE salary SET sex = CASE WHEN sex='f' THEN 'm' WHEN sex='m' THEN 'f' END
# MySQL
UPDATE salary SET sex = IF(sex='m', 'f', 'm')
-- Oracle
UPDATE salary SET sex = DECODE(sex, 'f', 'm', 'm', 'f')
```
