module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define('file', {
    type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    upload_time: {
      type: Sequelize.STRING
    },
    times_downloaded: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return File;
}
