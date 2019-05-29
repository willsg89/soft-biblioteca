CREATE TABLE livros (
     id INT NOT NULL AUTO_INCREMENT,
     nome VARCHAR(30) NOT NULL,
     ano SMALLINT NOT NULL,
     isbn13 VARCHAR(13),
     isbn10 VARCHAR(10),
     dono VARCHAR(30) NOT NULL,
     descricao VARCHAR(200) NOT NULL,
     dataInclusao BIGINT NOT NULL,
     ultimaAtualizacao BIGINT NOT NULL,
     tipo ENUM('livro', 'periodico') NOT NULL,
     PRIMARY KEY (id)
);
