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

---
insert into livros(nome, ano, isbn13, isbn10, dono, descricao, dataInclusao, ultimaAtualizacao, tipo)
values
('java ii', 1999, '123456789', '65465', 'william.guimaraes', 'bl ALASD ALSLSL', 1559240731440, 1559240731440, 'livro'),
('Teste automa', 2010, '23421453453', '24234', 'raphael.silva', 'bl ALASD ALSLSL', 1559240731440, 1559240731440, 'livro');
('c#', 1999, '213123', '3433', 'william.guimaraes', 'bl asd ALASD ALSLSL', 1559240731440, 1559240731440, 'periodico'),
('design', 2010, '23421453453', '24234', 'natalia.oliveira', 'bl ALASD ALSLSL', 1559240731440, 1559240731440, 'livro');
