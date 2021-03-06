const connect = require("../config/db");
const util = require("util");

const Mentor = (mentor) => {
  this.idMentor = mentor.idMentor;
  this.fullNameMentor = mentor.fullName;
  this.dayOfBirth = mentor.dayOfBirth;
  this.address = mentor.address;
  this.workplace = mentor.workplace;
  this.email = mentor.email;
  this.position = mentor.position;
  this.idDG = mentor.idDG;
  this.idInternshipCourse = mentor.idInternshipCourse;
};

Mentor.get = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    // let listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn} FROM mentor ${inner} WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Mentor.getdiddg = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    let listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn} FROM mentor WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};


Mentor.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.mentorId) {
    strWhere += " AND idMentor = " + condition.mentorId;
  }
  if (condition.idDGs) {
    strWhere += " AND mentor.idDG = " + condition.idDGs;
  }
  if (condition.idMentor) {
    strWhere += " AND idMentor = " + condition.idMentor;
  }

  if (condition.emailMentor) {
    strWhere += ' AND mentor.email = "' + condition.emailMentor + '"';
  }
  if (condition.idInternshipCourse) {
    strWhere +=
      ' AND mentor.idInternshipCourse = "' + condition.idInternshipCourse + '"';
  }
  if (condition.internshipcourseId) {
    strWhere +=
      " AND mentor.idInternshipCourse  = " + condition.internshipcourseId;
  }

  return strWhere;
};
Mentor.getdetailBatch = async (condition, columns, page, limit) => {
    let listColumn = "*";

  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);

    const strSql = `SELECT ${listColumn} FROM mentor ${inner}  WHERE ${where}  ORDER BY idMentor DESC  LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

const inner = ` INNER JOIN internshipcourse
INNER JOIN dg 
ON mentor.idInternshipCourse = internshipcourse.idInternshipCourse 
AND mentor.idDG = dg.idDG`;
const listColumn = `mentor.idMentor,
mentor.fullNameMentor,
mentor.dayOfBirth,
mentor.workplace,
mentor.email,
mentor.address,
mentor.position,
dg.nameDG,
internshipCourse.nameCoure `;

Mentor.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Mentor.create = async (condition) => {
  try {
    const sql = `INSERT INTO mentor SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Mentor.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE mentor SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Mentor.ERROR_EMPTY = "Vui l??ng ??i???n ?????y ????? th??ng tin !";
Mentor.ERROR_SPECIAL_CHARACTERISTICS =
  "Vui l??ng t??n c???a b???n kh??ng d??ng k?? t??? ?????c bi???t !!!!";
Mentor.ERROR_LENGHT = "Vui l??ng nh???p th??ng tin trong kho???ng 2 -> 255 k?? t??? !!!";
Mentor.ERROR_DATE = " Ng??y sinh kh??ng h???p l??? ph???i l???n h??n 01/01/1960 !!!";
Mentor.ERROR_EMAIL = "Email kh??ng h???p l??? !!!";
Mentor.MESSAGE_CREATE = "Th??m th??nh c??ng !!!";
Mentor.MESSAGE_UPDATE = "C???p nh???t th??nh c??ng !!!";
Mentor.ERROR_CREATE = "idDG ho???c idInternshipCourse kh??ng t???n t???i !!!";
Mentor.ERROR_UPDATE = "ID ng?????i h?????ng d???n kh??ng t???n t???i";
Mentor.ERROR_DATENOW = "Ng??y sinh kh??ng ???????c l???n h??n ng??y hi???n t???i !!!";
Mentor.MESSAGE_DELETE = "X??a th??nh c??ng !!!";
Mentor.ERROR_DELETE = " ID ng?????i h?????ng d???n kh??ng t???n t???i";
Mentor.ERROR_EMAIL_DUPLICATE = "Email ng?????i h?????ng d???n ???? t???n t???i";
module.exports = Mentor;
